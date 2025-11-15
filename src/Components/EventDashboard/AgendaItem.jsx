const AgendaItem = ({ time, segment, leader, materials, }) => {

 const formattedTime = new Date(`1970-01-01T${time}`)
  .toLocaleTimeString([], { hour: "numeric", minute: "2-digit", hour12: true });


  return (
    <div className="flex flex-row text-[100%] bg-yellow-100 m-2 p-2 rounded-2xl justify-left gap-10">
      <span>Time: {formattedTime}</span>
      <span>Segment: {segment}</span>
      <span>Leader: {leader || "No Assigned Leader"}</span>
      <span>Materials: {materials || "No Materials"}</span>
    </div>
  );
};


export default AgendaItem;