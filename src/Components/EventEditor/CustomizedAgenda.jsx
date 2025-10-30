import { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import MembersDialogs from "../Dialogs/MembersDialogs";
import { Pencil1Icon } from "@radix-ui/react-icons";

const CustomizedAgenda = forwardRef(({ agenda, onDelete }, ref) => {
  const [selectedMember, setSelectedMember] = useState();

  const { register, handleSubmit, reset, getValues } = useForm({
    defaultValues: {
      time: agenda.time,
      segment: agenda.segment,
    },
  });

  useEffect(() => {
    reset({
      time: agenda.time,
      segment: agenda.segment,
    });
  }, [agenda, reset]);

  const collectData = (data) => ({
    ...agenda,
    time: data.time,
    segment: data.segment,
    leader: selectedMember?.name ?? agenda.leader,
  });

  useImperativeHandle(ref, () => ({
    submitForm: () => handleSubmit((data) => collectData(data))(),
    getValues: () => collectData(getValues()),
  }));

  return (
    <div className="bg-amber-200 rounded-2xl p-4">
      <form
        onSubmit={handleSubmit(collectData)}
        className="flex gap-4 portrait:flex-col landscape:flex-row landscape:items-center"
      >
        <div className="flex items-center gap-2">
          <label htmlFor="time" className="text-sm">Time:</label>
          <input
            {...register("time")}
            type="time"
            id="time"
            className="bg-white rounded-md w-[100px] p-1 text-sm portrait:w-full"
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="segment" className="text-sm">Segment:</label>
          <input
            {...register("segment")}
            id="segment"
            className="bg-white rounded-md w-[120px] p-1 text-sm portrait:w-full"
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="leader" className="text-sm">Leader:</label>
          <MembersDialogs
            buttonName={!selectedMember ? agenda.leader_name : selectedMember.name}
            onSelectMember={setSelectedMember}
            buttonStyle="bg-amber-600 rounded p-2 hover:bg-amber-900 text-white"
            icon={<Pencil1Icon />}
          />
        </div>
        <div className="w-full md:w-auto md:ms-auto flex justify-end items-center gap-2 shrink-0">
          <button
            type="button"
            className="bg-amber-900 text-white rounded-md px-3 py-1 text-sm hover:bg-amber-500 whitespace-nowrap"
            onClick={() => onDelete(agenda)}
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
});

export default CustomizedAgenda;