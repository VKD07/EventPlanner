const TeamDetails = ({ teamName, members }) => {

  if (!teamName) {
    return null;
  }

  return (
    <div className="bg-pew-light/40 border border-brass/10 rounded-xl p-4 hover:border-brass/30 hover:bg-pew-light transition-colors">
      <h3 className="font-display font-semibold text-parchment text-sm mb-3">{teamName}</h3>

      <div className="space-y-2">
        {members.length > 0 ? (
          members.map(m => (
            <div key={m.id} className="flex items-center gap-2 text-sm text-parchment/80">
              <div className="w-6 h-6 bg-brass/15 rounded-full flex items-center justify-center text-xs font-medium text-brass-light border border-brass/30">
                {m.name.charAt(0).toUpperCase()}
              </div>
              <span>{m.name}</span>
            </div>
          ))
        ) : (
          <p className="text-xs text-parchment/40 italic">No members assigned</p>
        )}
      </div>
    </div>
  );
};

export default TeamDetails;
