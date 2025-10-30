const TeamDetails = ({ teamName, members }) => {

  if (!teamName) {
    return (
      <div className="bg-amber-500 rounded-2xl p-4">
        <h1>No Team!</h1>
      </div>
    );
  }

  return (
    <div className="bg-amber-500 rounded-2xl p-4">
      <h2 className="pb-2 font-semibold">Team: {teamName}</h2>
      <div className="border-b-2 mb-2" />

      <div className="flex flex-col gap-1">
        {members.length > 0 ? (
          members.map(m => (
            <span key={m.id}>{m.name}</span>
          ))
        ) : (
          <h1 className="italic opacity-70">No members!</h1>
        )}
      </div>
    </div>
  );
};

export default TeamDetails;
