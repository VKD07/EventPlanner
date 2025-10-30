import { CrossCircledIcon } from "@radix-ui/react-icons";

const TeamEditorMember = ({ member, onRemoveName }) => {
  return (
    <div className="bg-amber-200 rounded p-2 flex items-center">
      <span>{member.member_name}</span>
      <button onClick={() => onRemoveName(member)} className="ml-auto">
        <CrossCircledIcon />
      </button>
    </div>
  );
};

export default TeamEditorMember;
