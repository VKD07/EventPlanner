import { createContext } from "react";

const membersContext = createContext();

const MemebersContextProvider = ({ children }) => {
  const initMembers = [
    { id: crypto.randomUUID, name: "John Doe", role: "Coordinator" },
    { id: crypto.randomUUID, name: "Jane Smith", role: "Volunteer" },
    { id: crypto.randomUUID, name: "Mike Johnson", role: "Organizer" },
  ];

  const [members, setMembers] = useState(initMembers);

  function addMember(newMember) {
    setMemebers((members) => [...members, newMember]);
  }

  function removeMember(newMemberId) {
    setMembers((members) =>
      members.filter((member) => member.id !== newMemberId)
    );
  }

  function updateMemeber(updatedMemberId) {
    setMemebers((memebers) =>
      memebers.map((memeber) =>
        memeber.id === updatedMemberId ? updatedMemberId : memeber
      )
    );
  }

  return (
    <>
      <MemebersContextProvider
        value={{ members, addMember, removeMember, updateMemeber }}
      >
        {children}
      </MemebersContextProvider>
    </>
  );
};

export const useMembers = () => useContext(membersContext);
