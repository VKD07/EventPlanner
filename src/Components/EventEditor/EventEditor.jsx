import { useParams } from "react-router-dom";
import { useEventsContext } from "../../Context/EventDataContext";
import CustomizedEventFlow from "./CustomizedEventFlow";
import { useEvent } from "../../hooks/useEvents";
import { useGetTeamAndMembersByEventID } from "../../hooks/useTeams";
import TeamEditor from "./TeamEditor";
import { useMemo } from "react";

const EventEditor = () => {
  const { eventId } = useParams();

  const { updateEvent } = useEventsContext();

  const { data: events, isLoading } = useEvent();

  const { data: teamsData } = useGetTeamAndMembersByEventID(eventId);

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
    return <div>LOADING....</div>;
  }

  const selectedEvent = events.find((event) => event.id === eventId);

  function onAddTeam() {
    const newTeam = {
      id: crypto.randomUUID(),
      name: "New Team",
      members: [],
    };

    const updatedEvent = {
      ...selectedEvent,
      teams: [...selectedEvent.teams, newTeam],
    };
    updateEvent(updatedEvent);
  }

  return (
    <div className="flex flex-col flex-wrap gap-5 mt-20 lg:grid portrait:grid-cols-[25%_55%_15%] landscape:grid-cols-[25%_55%_17%]">
      <div className="bg-amber-200 rounded h-[300px]">Library Elements</div>

      <CustomizedEventFlow selectedEvent={selectedEvent} />

      <div className="bg-amber-900 rounded h-auto">
        <div className="flex flex-wrap justify-end gap-2 m-3">
          <button
            onClick={onAddTeam}
            className="bg-amber-300 p-1 rounded hover:bg-amber-600"
          >
            Add
          </button>
        </div>
        {/* For the teams */}
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
          <h1>No teams created</h1>
        )}
      </div>
    </div>
  );
};

export default EventEditor;
