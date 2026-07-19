import {
  useAddMemberIntoTeam,
  useRemoveMemberFromTeam,
  useUpdateTeamName,
  useDeleteTeam,
} from "../../hooks/useTeams";
import MembersDialogs from "../Dialogs/MembersDialogs";
import TeamEditorMember from "./TeamEditorMember";
import { useState, useEffect } from "react";

const TeamEditor = ({ teamID, teamName, members }) => {
  const [initTeamName, setTeamName] = useState(teamName);

  useEffect(() => {
    setTeamName(teamName);
  }, [teamName]);

  const addMemberMutation = useAddMemberIntoTeam();
  const removeMemberMutation = useRemoveMemberFromTeam();
  const teamNameMutation = useUpdateTeamName();
  const deletTeamMutation = useDeleteTeam();

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

  function handleTeamNameChange() {
    teamNameMutation.mutate(
      { team_id: teamID, team_name: initTeamName },
      {
        onSuccess: () => console.log("✅ Team name updated successfully!"),
        onError: (err) => console.error("❌ Error updating team name:", err),
      }
    );
  }

  function onDeleteTeam() {
    deletTeamMutation.mutate(teamID, {
      onSuccess: () => console.log("✅ Team deleted successfully!"),
      onError: (err) => console.error("❌ Error deleting team:", err),
    });
  }

  function handleOnChange(e) {
    setTeamName(e.target.value);
  }

  return (
    <div className="bg-pew-light/40 border border-brass/10 rounded-xl flex flex-col p-4">
      <form className="flex flex-row items-center gap-2 flex-wrap">
        <label className="text-[11px] font-semibold uppercase tracking-wide text-parchment/40">Team name</label>
        <input
          type="text"
          className="bg-ink border border-brass/20 focus:border-brass focus:outline-none text-parchment w-32 rounded-md px-2 py-1 text-sm"
          onBlur={handleTeamNameChange}
          onChange={handleOnChange}
          value={initTeamName}
        />
      </form>

      <div className="flex flex-col gap-2 mt-3">
        {members && members.length > 0 ? (
          members.map((member) => (
            <TeamEditorMember
              key={member.member_id || member.id}
              member={member}
              onRemoveName={onRemoveName}
            />
          ))
        ) : (
          <p className="text-parchment/40 text-sm italic">
            No members in this team
          </p>
        )}
      </div>

      <div className="flex gap-2 justify-end mt-3">
        <MembersDialogs
          buttonName={"Add"}
          onSelectMember={onSelectMember}
          buttonStyle={"bg-brass hover:bg-brass-light text-inkwell text-sm font-semibold rounded-md px-3 py-1.5 transition-colors"}
        />
        <button onClick={onDeleteTeam} className="bg-ember hover:bg-ember-light text-white text-sm rounded-md px-3 py-1.5 transition-colors">
          Delete
        </button>
      </div>
    </div>
  );
};

export default TeamEditor;
