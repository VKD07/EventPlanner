import { useParams } from "react-router-dom";
import CustomizedEventFlow from "./CustomizedEventFlow";
import { useEvent } from "../../hooks/useEvents";
import {
  useGetTeamAndMembersByEventID,
  useCreateNewTeamForEvent,
} from "../../hooks/useTeams";
import TeamEditor from "./TeamEditor";
import { useMemo } from "react";

const EventEditor = () => {
  const { eventId } = useParams();

  const { data: events, isLoading } = useEvent();

  const { data: teamsData } = useGetTeamAndMembersByEventID(eventId);
  const createTeamForEvent = useCreateNewTeamForEvent();

  const groupedTeams = useMemo(() => {
    if (!teamsData) return [];

    const teamsMap = {};

    teamsData.forEach((row) => {
      const { team_id, team_name, member_id, member_name, email, number } = row;

      if (!teamsMap[team_id]) {
        teamsMap[team_id] = {
          team_id,
          team_name,
          members: [],
        };
      }

      if (member_id) {
        teamsMap[team_id].members.push({
          member_id,
          member_name,
          email,
          number,
        });
      }
    });

    return Object.values(teamsMap);
  }, [teamsData]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-ink flex items-center justify-center text-parchment/60 font-mono text-sm">
        Loading…
      </div>
    );
  }

  const selectedEvent = events.find((event) => event.id === eventId);

  function onAddTeam() {
    createTeamForEvent.mutate({ eventID: eventId, teamName: "New Team" });
  }

  return (
    <div className="min-h-screen bg-ink flex flex-col gap-5 pt-24 pb-10 px-4 lg:px-8 lg:grid lg:grid-cols-[70%_28%] lg:gap-[2%]">
      <CustomizedEventFlow selectedEvent={selectedEvent} />

      <div className="bg-pew rounded-2xl h-auto border border-brass/15">
        <div className="flex items-center justify-between p-4 border-b border-brass/15">
          <h2 className="font-display font-semibold text-parchment">Teams</h2>
          <button
            onClick={onAddTeam}
            className="bg-brass hover:bg-brass-light text-inkwell text-sm font-semibold px-3 py-1.5 rounded-md transition-colors"
          >
            Add Team
          </button>
        </div>
        {/* For the teams */}
        <div className="p-3 flex flex-col gap-3">
          {groupedTeams.length > 0 ? (
            groupedTeams.map((team, index) => (
              <TeamEditor
                key={team.team_id || index}
                teamID={team.team_id}
                teamName={team.team_name}
                members={team.members}
              />
            ))
          ) : (
            <p className="text-parchment/40 text-sm italic p-2">No teams created</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventEditor;
