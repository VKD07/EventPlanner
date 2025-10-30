import { Dialog } from "radix-ui";

const Member = ({ member, onSelectMember }) => {
  return (
    <Dialog.Close>
      <div
        role="button"
        onClick={() => onSelectMember(member)}
        className="bg-amber-600 rounded p-8 flex flex-col items-left gap-2 hover:bg-amber-800"
      >
        <div className="text-left flex flex-col gap-1 flex-wrap">
          <span>Name: {member.name} </span>
          <span>Email: {member.email} </span>
          <span>Number: {member.number} </span>
        </div>

        <div className="flex flex-col">
          <span className="font-bold text-left">Roles:</span>
          <div className="flex gap-2 flex-wrap text-sm">
            {member.roles?.map((role, index) => (
              <span
                key={index}
                className="bg-green-300 rounded p-2 text-sm flex-row"
              >
                {role}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <span className="font-bold text-left">Skills:</span>
          <div className="flex gap-2 flex-wrap text-sm">
            {member.skills?.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-500 rounded p-2 text-sm flex-row"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Dialog.Close>
  );
};

export default Member;