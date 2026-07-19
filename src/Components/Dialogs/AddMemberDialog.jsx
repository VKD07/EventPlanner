import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Dialog from "@radix-ui/react-dialog";
import { useGetAllSkillsAndRoles, useCreateSkill, useCreateRole } from "../../hooks/useRolesAndSkills";
import {
  useCreateMember,
  useUpdateMember,
  useAddSkillToMember,
  useRemoveSkillFromMember,
  useAddRoleToMember,
  useRemoveRoleFromMember,
} from "../../hooks/useMembers";

const fieldClass =
  "bg-white border border-inkwell/15 rounded-md p-2 w-full text-inkwell placeholder:text-inkwell/40 focus:outline-none focus:ring-2 focus:ring-brass/50 focus:border-brass";

const AttributePicker = ({ label, options, selectedIds, onToggle, newValue, onNewValueChange, onCreate, isCreating }) => (
  <div>
    <span className="text-[11px] font-semibold uppercase tracking-wide text-inkwell/40 mb-1 block">
      {label}
    </span>
    <div className="flex flex-wrap gap-2 mb-2">
      {options?.length > 0 ? (
        options.map((option) => {
          const active = selectedIds.includes(option.id);
          return (
            <button
              type="button"
              key={option.id}
              onClick={() => onToggle(option.id)}
              className={`text-sm rounded-md px-3 py-1 border transition-colors ${
                active
                  ? "bg-brass text-inkwell border-brass"
                  : "bg-white text-inkwell/60 border-inkwell/15 hover:border-brass"
              }`}
            >
              {option.name}
            </button>
          );
        })
      ) : (
        <span className="text-inkwell/40 italic text-sm">None yet</span>
      )}
    </div>
    <div className="flex items-center gap-2">
      <input
        className={fieldClass}
        placeholder={`Add a new ${label.toLowerCase().replace(/s$/, "")}`}
        value={newValue}
        onChange={(e) => onNewValueChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            onCreate();
          }
        }}
      />
      <button
        type="button"
        onClick={onCreate}
        disabled={!newValue.trim() || isCreating}
        className="bg-inkwell/10 hover:bg-inkwell/20 text-inkwell text-sm font-medium rounded-md px-3 py-2 whitespace-nowrap disabled:opacity-50"
      >
        + Add
      </button>
    </div>
  </div>
);

const AddMemberDialog = ({ buttonName, buttonStyle, icon, member, open, onOpenChange }) => {
  const isEdit = !!member;
  const isControlled = open !== undefined;
  const [internalOpen, setInternalOpen] = useState(false);
  const dialogOpen = isControlled ? open : internalOpen;
  const { register, handleSubmit, reset } = useForm();
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [selectedSkillIds, setSelectedSkillIds] = useState([]);
  const [selectedRoleIds, setSelectedRoleIds] = useState([]);
  const [originalSkillIds, setOriginalSkillIds] = useState([]);
  const [originalRoleIds, setOriginalRoleIds] = useState([]);
  const [newSkillName, setNewSkillName] = useState("");
  const [newRoleName, setNewRoleName] = useState("");

  const { data: skillsAndRoles } = useGetAllSkillsAndRoles();
  const skillOptions = skillsAndRoles?.data?.find((f) => f.name === "Skills")?.elements || [];
  const roleOptions = skillsAndRoles?.data?.find((f) => f.name === "Role")?.elements || [];

  const createMemberMutation = useCreateMember();
  const updateMemberMutation = useUpdateMember();
  const addSkillMutation = useAddSkillToMember();
  const removeSkillMutation = useRemoveSkillFromMember();
  const addRoleMutation = useAddRoleToMember();
  const removeRoleMutation = useRemoveRoleFromMember();
  const createSkillMutation = useCreateSkill();
  const createRoleMutation = useCreateRole();

  const formDefaults = (m) => ({
    name: m?.name || "",
    email: m?.email || "",
    number: m?.number || "",
  });

  const resetAttributeSelection = () => {
    const skillIds = isEdit
      ? skillOptions.filter((s) => member.skills?.includes(s.name)).map((s) => s.id)
      : [];
    const roleIds = isEdit
      ? roleOptions.filter((r) => member.roles?.includes(r.name)).map((r) => r.id)
      : [];
    setSelectedSkillIds(skillIds);
    setSelectedRoleIds(roleIds);
    setOriginalSkillIds(skillIds);
    setOriginalRoleIds(roleIds);
  };

  useEffect(resetAttributeSelection, [skillsAndRoles, member, isEdit]);

  const toggleSkill = (id) => {
    setSelectedSkillIds((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));
  };

  const toggleRole = (id) => {
    setSelectedRoleIds((prev) => (prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]));
  };

  const handleCreateSkill = () => {
    const name = newSkillName.trim();
    if (!name) return;
    createSkillMutation.mutate(name, {
      onSuccess: (skill) => {
        setSelectedSkillIds((prev) => [...prev, skill.id]);
        setNewSkillName("");
      },
    });
  };

  const handleCreateRole = () => {
    const name = newRoleName.trim();
    if (!name) return;
    createRoleMutation.mutate(name, {
      onSuccess: (role) => {
        setSelectedRoleIds((prev) => [...prev, role.id]);
        setNewRoleName("");
      },
    });
  };

  const validateForm = (data) => {
    const newErrors = {};
    if (!data.name?.trim()) newErrors.name = "Member name is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const applyAttributeChanges = async (memberId) => {
    const addSkillIds = selectedSkillIds.filter((id) => !originalSkillIds.includes(id));
    const removeSkillIds = originalSkillIds.filter((id) => !selectedSkillIds.includes(id));
    const addRoleIds = selectedRoleIds.filter((id) => !originalRoleIds.includes(id));
    const removeRoleIds = originalRoleIds.filter((id) => !selectedRoleIds.includes(id));

    await Promise.all([
      ...addSkillIds.map((skillId) => addSkillMutation.mutateAsync({ memberId, skillId })),
      ...removeSkillIds.map((skillId) => removeSkillMutation.mutateAsync({ memberId, skillId })),
      ...addRoleIds.map((roleId) => addRoleMutation.mutateAsync({ memberId, roleId })),
      ...removeRoleIds.map((roleId) => removeRoleMutation.mutateAsync({ memberId, roleId })),
    ]);
  };

  const onSubmit = async (data) => {
    if (!validateForm(data)) return;

    setIsSaving(true);
    setIsSuccess(false);

    const payload = {
      name: data.name.trim(),
      email: data.email?.trim() || null,
      number: data.number?.trim() || null,
    };

    try {
      const savedMember = isEdit
        ? await updateMemberMutation.mutateAsync({ id: member.id, ...payload })
        : await createMemberMutation.mutateAsync(payload);

      await applyAttributeChanges(savedMember.id);

      setIsSaving(false);
      setIsSuccess(true);
      setErrors({});

      if (!isEdit) {
        reset(formDefaults());
        setSelectedSkillIds([]);
        setSelectedRoleIds([]);
        setOriginalSkillIds([]);
        setOriginalRoleIds([]);
      } else {
        setOriginalSkillIds(selectedSkillIds);
        setOriginalRoleIds(selectedRoleIds);
      }
    } catch (err) {
      setIsSaving(false);
      setIsSuccess(false);
      console.error(`Error ${isEdit ? "updating" : "adding"} member:`, err);
    }
  };

  const handleDialogChange = (open) => {
    if (open) {
      reset(formDefaults(member));
      resetAttributeSelection();
    } else {
      setIsSaving(false);
      setIsSuccess(false);
      setErrors({});
      setNewSkillName("");
      setNewRoleName("");
    }
  };

  const handleOpenChange = (nextOpen) => {
    if (isControlled) {
      onOpenChange?.(nextOpen);
    } else {
      setInternalOpen(nextOpen);
    }
    handleDialogChange(nextOpen);
  };

  return (
    <Dialog.Root open={dialogOpen} onOpenChange={handleOpenChange}>
      {buttonName && (
        <Dialog.Trigger className={buttonStyle}>
          <div className="flex flex-row items-center gap-2">
            {buttonName}
            {icon}
          </div>
        </Dialog.Trigger>
      )}

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-ink/60 backdrop-blur-sm z-[60]" />
        <Dialog.Content
          className="fixed z-[60] bg-paper shadow-2xl border-t-4 border-brass rounded-2xl
          top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          p-4 md:p-8 mt-4 md:mt-10 max-h-[90vh] w-[95vw] md:w-auto md:min-w-[600px] overflow-y-auto"
        >
          <Dialog.Close asChild>
            <button
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-ember text-white hover:bg-ember-light transition-colors"
              aria-label="Close"
            >
              ✕
            </button>
          </Dialog.Close>

          <Dialog.Title className="font-display text-xl font-semibold text-inkwell mb-4">
            {isEdit ? "Edit Member" : "Add a Member"}
          </Dialog.Title>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input {...register("name")} placeholder="Name" className={fieldClass} />
              {errors.name && <p className="text-ember text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <input
                {...register("email")}
                placeholder="Email (optional)"
                type="email"
                className={fieldClass}
              />
            </div>

            <div>
              <input
                {...register("number")}
                placeholder="Phone number (optional)"
                className={fieldClass}
              />
            </div>

            <AttributePicker
              label="Roles"
              options={roleOptions}
              selectedIds={selectedRoleIds}
              onToggle={toggleRole}
              newValue={newRoleName}
              onNewValueChange={setNewRoleName}
              onCreate={handleCreateRole}
              isCreating={createRoleMutation.isPending}
            />

            <AttributePicker
              label="Skills"
              options={skillOptions}
              selectedIds={selectedSkillIds}
              onToggle={toggleSkill}
              newValue={newSkillName}
              onNewValueChange={setNewSkillName}
              onCreate={handleCreateSkill}
              isCreating={createSkillMutation.isPending}
            />

            <div className="font-medium h-6 text-sm">
              {isSaving ? (
                <span className="text-sage">Saving...</span>
              ) : isSuccess ? (
                <span className="text-sage">{isEdit ? "Member updated!" : "Member added!"}</span>
              ) : null}
            </div>

            <input
              type="submit"
              value={isSaving ? "Saving..." : isEdit ? "Save Changes" : "Add Member"}
              disabled={isSaving}
              className="bg-brass hover:bg-brass-light text-inkwell font-semibold rounded-md p-2 cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AddMemberDialog;
