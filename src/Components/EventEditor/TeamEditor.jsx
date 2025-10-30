import {
  useAddMemberIntoTeam,
  useRemoveMemberFromTeam,
  useUpdateTeamName,
} from "../../hooks/useTeams";
import MembersDialogs from "../Dialogs/MembersDialogs";
import TeamEditorMember from "./TeamEditorMember";
import { useState, useEffect } from "react";

const TeamEditor = ({ teamID, teamName, members }) => {
  const [initTeamName, setTeamName] = useState(teamName);

  useEffect(() => {
    setTeamName(teamName);
  }, [teamName]); // ✅ ensures state syncs when data refetches

  const addMemberMutation = useAddMemberIntoTeam();
  const removeMemberMutation = useRemoveMemberFromTeam();
  const teamNameMutation = useUpdateTeamName();

  function onSelectMember(member) {
    addMemberMutation.mutate(
      { team_id: teamID, member_id: member.id },
      {
        onSuccess: () => console.log("✅ Member added successfully!"),
        onError: (err) => console.error("❌ Error adding member:", err),
      }
    );
  }

  function onRemoveName(member) {
    removeMemberMutation.mutate(
      { team_id: teamID, member_id: member.member_id },
      {
        onSuccess: () => console.log("✅ Member removed successfully!"),
        onError: (err) => console.error("❌ Error removing member:", err),
      }
    );
  }

  //FIX THIS WHEN YOU UNBLUR AN INPUT IT ALTERS THE MEMEBERS
  function handleTeamNameChange() {
    teamNameMutation.mutate(
      { team_id: teamID, team_name: initTeamName },
      {
        onSuccess: () => console.log("✅ Team name updated successfully!"),
        onError: (err) => console.error("❌ Error updating team name:", err),
      }
    );
  }

  function handleOnChange(e) {
    setTeamName(e.target.value);
  }

  return (
    <div className="bg-amber-400 rounded flex flex-wrap flex-col p-3 m-3">
      <form className="flex flex-row gap-2 flex-wrap">
        <label className="font font-bold">Team name:</label>
        <input
          type="text"
          className="bg-amber-200 w-30 rounded-md flex pl-2"
          onBlur={handleTeamNameChange}
          onChange={handleOnChange}
          value={initTeamName}
        />
      </form>

      <div className="flex flex-col gap-2 mt-3">
        {members && members.length > 0 ? (
          members.map((member) => (
            <TeamEditorMember
              key={member.member_id || member.id} // ✅ stable key
              member={member}
              onRemoveName={onRemoveName}
            />
          ))
        ) : (
          <h1 className="text-gray-500 text-sm italic">
            No members in this team
          </h1>
        )}
      </div>

      <div className="flex gap-2 justify-end mt-3">
        <MembersDialogs
          buttonName={"ADD"}
          onSelectMember={onSelectMember}
          buttonStyle={"bg-amber-600 rounded p-2 hover:bg-amber-900"}
        />
        <button className="bg-amber-600 rounded p-2 hover:bg-amber-900">
          DELETE
        </button>
      </div>
    </div>
  );
};

export default TeamEditor;
