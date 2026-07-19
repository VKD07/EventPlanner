import * as Dialog from "@radix-ui/react-dialog";

const MemberCardBody = ({ member }) => (
  <>
    {/* Member Info */}
    <div className="text-left flex flex-col gap-1 w-full">
      <span className="font-display font-semibold text-inkwell text-base truncate">
        {member.name}
      </span>
      <span className="text-inkwell/60 text-sm break-words">
        {member.email}
      </span>
      <span className="text-inkwell/60 text-sm">
        {member.number}
      </span>
    </div>

    {/* Roles */}
    <div className="flex flex-col gap-1">
      <span className="text-[11px] font-semibold uppercase tracking-wide text-inkwell/40">
        Roles
      </span>
      <div className="flex gap-1.5 flex-wrap text-xs">
        {member.roles?.length > 0 ? (
          member.roles.map((role, index) => (
            <span key={index} className="bg-sage/15 text-sage rounded px-2 py-1">
              {role}
            </span>
          ))
        ) : (
          <span className="text-inkwell/30 italic text-xs">None</span>
        )}
      </div>
    </div>

    {/* Skills */}
    <div className="flex flex-col gap-1">
      <span className="text-[11px] font-semibold uppercase tracking-wide text-inkwell/40">
        Skills
      </span>
      <div className="flex gap-1.5 flex-wrap text-xs">
        {member.skills?.length > 0 ? (
          member.skills.map((skill, index) => (
            <span
              key={index}
              className="bg-brass/15 text-inkwell rounded px-2 py-1"
            >
              {skill}
            </span>
          ))
        ) : (
          <span className="text-inkwell/30 italic text-xs">None</span>
        )}
      </div>
    </div>
  </>
);

const Member = ({ member, onSelectMember, onEdit, onDelete }) => {
  const managed = !!(onEdit || onDelete);

  if (managed) {
    return (
      <div className="bg-white border border-inkwell/10 rounded-lg p-5 flex flex-col gap-3 hover:border-brass hover:shadow-md transition h-[330px] justify-between">
        <MemberCardBody member={member} />
        <div className="flex items-center gap-3 pt-2 border-t border-inkwell/10">
          {onEdit && (
            <button
              type="button"
              onClick={() => onEdit(member)}
              className="text-sm font-medium text-brass-light hover:text-brass hover:underline"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              type="button"
              onClick={() => onDelete(member)}
              className="text-sm font-medium text-ember hover:text-ember-light hover:underline"
            >
              Remove
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <Dialog.Close asChild>
      <div
        role="button"
        onClick={() => onSelectMember?.(member)}
        className="bg-white border border-inkwell/10 rounded-lg p-5 flex flex-col gap-3 hover:border-brass hover:shadow-md cursor-pointer transition h-[330px] justify-between"
      >
        <MemberCardBody member={member} />
      </div>
    </Dialog.Close>
  );
};

export default Member;
