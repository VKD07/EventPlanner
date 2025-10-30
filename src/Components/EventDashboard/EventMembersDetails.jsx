import { useMemo } from "react";
import TeamDetails from "./TeamDetails";
import ConsoleDebug from "../ConsoleDebug";
import { useEventsContext } from "../../Context/EventDataContext";
import { useGetTeamAndMembersByEventID } from "../../hooks/useTeams";

const EventMembersDetails = () => {
  const { selectedEvent } = useEventsContext();
  const { data: teamsData } = useGetTeamAndMembersByEventID(selectedEvent?.id);

  const teams = useMemo(() => {
    if (!teamsData) return [];
    const grouped = teamsData.reduce((acc, row) => {
      const { team_id, team_name, member_id, member_name, email, number } = row;
      if (!acc[team_id]) {
        acc[team_id] = { id: team_id, name: team_name, members: [] };
      }
      if (member_id) {
        acc[team_id].members.push({
          id: member_id,
          name: member_name,
          email,
          number,
        });
      }
      return acc;
    }, {});
    return Object.values(grouped);
  }, [teamsData]);

  return (
    <div className="bg-amber-600 rounded-2xl mt-20 h-auto lg:mt-[81px]">
      <ConsoleDebug componentName="EventMembersDetails" />
      <h1 className="pt-5 pl-5 font-bold">TEAMS:</h1>
      <div className="flex flex-col p-4 gap-3 overflow-y-auto max-h-[700px]">
        {teams.length > 0 ? (
          teams.map((team) => (
            <TeamDetails key={team.id} teamName={team.name} members={team.members} />
          ))
        ) : (
          <h1>NO TEAMS CREATED</h1>
        )}
      </div>
    </div>
  );
};

export default EventMembersDetails;
