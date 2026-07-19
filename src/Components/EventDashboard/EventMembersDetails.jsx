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
    <div className="w-full bg-pew rounded-2xl shadow-xl border border-brass/15 p-6 hover:shadow-2xl transition-shadow">
      <ConsoleDebug componentName="EventMembersDetails" />
      <h2 className="font-display text-lg font-semibold text-parchment mb-4">Teams</h2>
      <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-pew-light scrollbar-track-transparent">
        {teams.length > 0 ? (
          teams.map((team) => (
            <TeamDetails key={team.id} teamName={team.name} members={team.members} />
          ))
        ) : (
          <div className="text-center py-8">
            <div className="w-10 h-10 mx-auto rounded-full border-2 border-dashed border-brass/30 flex items-center justify-center mb-3">
              <span className="font-display text-brass/50">§</span>
            </div>
            <p className="text-sm text-parchment/40">No teams created yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventMembersDetails;
