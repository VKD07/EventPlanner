import { CrossCircledIcon } from "@radix-ui/react-icons";

const TeamEditorMember = ({ member, onRemoveName }) => {
  return (
    <div className="bg-ink border border-brass/10 rounded-md px-3 py-1.5 flex items-center">
      <span className="text-parchment/80 text-sm">{member.member_name}</span>
      <button
        onClick={() => onRemoveName(member)}
        className="ml-auto text-parchment/40 hover:text-ember transition-colors"
        aria-label="Remove member"
      >
        <CrossCircledIcon />
      </button>
    </div>
  );
};

export default TeamEditorMember;
