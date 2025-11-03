import * as Dialog from "@radix-ui/react-dialog";

const Member = ({ member, onSelectMember }) => {
  return (
    <Dialog.Close asChild>
      <div
        role="button"
        onClick={() => onSelectMember?.(member)}
        className="bg-amber-600 rounded p-6 flex flex-col gap-3 hover:bg-amber-800 cursor-pointer transition h-[350px] justify-between"
      >
        {/* Member Info */}
        <div className="text-left flex flex-col gap-1 w-full">
          <div className="flex justify-between flex-wrap w-full">
            <span className="font-semibold">Name:</span>
            <span className="truncate max-w-[180px]">{member.name}</span>
          </div>

          <div className="flex justify-between flex-wrap w-full">
            <span className="font-semibold">Email:</span>
            <span className="break-words text-sm max-w-[180px]">
              {member.email}
            </span>
          </div>

          <div className="flex justify-between flex-wrap w-full">
            <span className="font-semibold">Number:</span>
            <span className="text-sm">{member.number}</span>
          </div>
        </div>

        {/* Roles */}
        <div className="flex flex-col">
          <span className="font-bold text-left">Roles:</span>
          <div className="flex gap-2 flex-wrap text-sm">
            {member.roles?.map((role, index) => (
              <span key={index} className="bg-green-300 rounded p-2 text-sm">
                {role}
              </span>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="flex flex-col">
          <span className="font-bold text-left">Skills:</span>
          <div className="flex gap-2 flex-wrap text-sm">
            {member.skills?.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-500 rounded p-2 text-sm text-white"
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
