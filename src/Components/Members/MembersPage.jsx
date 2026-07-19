import { useState, useMemo } from "react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import ConsoleDebug from "../ConsoleDebug";
import Member from "../Member";
import MemberFilters from "../Dialogs/MemberFilters";
import AddMemberDialog from "../Dialogs/AddMemberDialog";
import { useGetAllMembersAndTheirAtrrib, useDeleteMember } from "../../hooks/useMembers";
import { useGetAllSkillsAndRoles } from "../../hooks/useRolesAndSkills";

const MembersPage = () => {
  const { data: members, isLoading } = useGetAllMembersAndTheirAtrrib();
  const { data: skillsAndRoles } = useGetAllSkillsAndRoles();
  const deleteMemberMutation = useDeleteMember();

  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState({});
  const [editingMember, setEditingMember] = useState(null);

  function handleFilters(category, filters) {
    setActiveFilters((prev) => ({ ...prev, [category]: filters }));
  }

  function handleDelete(member) {
    if (!window.confirm(`Remove ${member.name}? This also removes them from any teams.`)) return;
    deleteMemberMutation.mutate(member.id);
  }

  const filteredMembers = useMemo(() => {
    if (!members) return [];

    const filteredByFilters = members.filter((member) =>
      Object.entries(activeFilters).every(([category, filters]) => {
        if (!filters.length) return true;
        if (category.toLowerCase() === "skills") {
          return member.skills?.some((skill) => filters.includes(skill));
        }
        if (category.toLowerCase() === "role") {
          return member.roles?.some((role) => filters.includes(role));
        }
        return true;
      })
    );

    return filteredByFilters.filter((member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [members, activeFilters, searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-ink via-ink to-pew">
      <ConsoleDebug componentName="MembersPage" />

      <div className="flex flex-col gap-6 px-4 pt-24 pb-8 lg:px-8 max-w-[1400px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-semibold text-parchment">Members</h1>
            <p className="text-sm text-parchment/50 mt-1">Add, edit, and manage members, roles, and skills</p>
          </div>
          <AddMemberDialog
            buttonName={"Add a Member"}
            buttonStyle={"bg-brass hover:bg-brass-light text-inkwell font-semibold text-sm px-4 py-2.5 rounded-md transition-colors whitespace-nowrap"}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex items-center gap-2 bg-pew rounded-lg border border-brass/15 focus-within:border-brass px-4 py-3 flex-1 max-w-md">
            <MagnifyingGlassIcon className="text-parchment/40" />
            <input
              className="w-full bg-transparent text-parchment placeholder:text-parchment/40 focus:outline-none"
              placeholder="Search by name"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {skillsAndRoles?.data?.map((filter) => (
              <MemberFilters
                key={filter.id}
                categoryName={filter.name}
                filterOptions={filter.elements}
                selectedFilters={(filters) => handleFilters(filter.name, filters)}
              />
            ))}
          </div>
        </div>

        {isLoading ? (
          <p className="text-parchment/40 font-mono text-sm">Loading members…</p>
        ) : filteredMembers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMembers.map((member) => (
              <Member key={member.id} member={member} onEdit={setEditingMember} onDelete={handleDelete} />
            ))}
          </div>
        ) : (
          <div className="bg-pew rounded-2xl border border-brass/15 p-12 flex flex-col items-center justify-center text-center">
            <div className="w-14 h-14 rounded-full border-2 border-brass/40 flex items-center justify-center mb-4">
              <span className="font-display text-brass/60 text-xl">☺</span>
            </div>
            <h2 className="font-display text-lg font-medium text-parchment mb-2">
              {members?.length ? "No members match your search" : "No members yet"}
            </h2>
            <p className="text-sm text-parchment/40">
              {members?.length ? "Try a different name or filter" : "Add your first member to get started"}
            </p>
          </div>
        )}

        {editingMember && (
          <AddMemberDialog
            key={editingMember.id}
            member={editingMember}
            open={!!editingMember}
            onOpenChange={(open) => !open && setEditingMember(null)}
          />
        )}
      </div>
    </div>
  );
};

export default MembersPage;
