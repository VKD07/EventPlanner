import { useState, useMemo } from "react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useGetAllMembersAndTheirAtrrib } from "../../hooks/useMembers";
import { useGetAllSkillsAndRoles } from "../../hooks/useRolesAndSkills";
import Member from "../Member";
import MemberFilters from "./MemberFilters";
import * as Dialog from "@radix-ui/react-dialog";

const MembersDialogs = ({ buttonName, onSelectMember, buttonStyle, icon }) => {
  const { data: members } = useGetAllMembersAndTheirAtrrib();
  const { data: skillsAndRoles } = useGetAllSkillsAndRoles();

  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState({});

  function handleSelectedMember(member) {
    onSelectMember?.(member);
  }

  function handleFilters(category, filters) {
    setActiveFilters((prev) => ({
      ...prev,
      [category]: filters,
    }));
  }

  const filteredMembers = useMemo(() => {
    if (!members) return [];

    const filteredByFilters = members.filter((member) => {
      return Object.entries(activeFilters).every(([category, filters]) => {
        if (!filters.length) return true;

        if (category.toLowerCase() === "skills") {
          return member.skills?.some((skill) => filters.includes(skill));
        }

        if (category.toLowerCase() === "role") {
          return member.roles?.some((role) => filters.includes(role));
        }

        return true;
      });
    });

    return filteredByFilters.filter((member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [members, activeFilters, searchQuery]);

  return (
    <Dialog.Root>
      <Dialog.Trigger className={buttonStyle}>
        <div className="flex flex-row items-center gap-2">
          {buttonName}
          {icon}
        </div>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />

        <Dialog.Content
          className="fixed bg-amber-200 shadow rounded-2xl
          top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
          p-8 mt-10 max-h-[90vh] min-w-[1000px] overflow-y-auto"
        >
          <Dialog.Title className="text-xl">Choose a member:</Dialog.Title>

          <div className="flex items-center gap-1">
            <input
              className="bg-white rounded border-2 border-amber-500 my-2 ml-55 w-[700px]"
              placeholder="Search Names"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <MagnifyingGlassIcon />
          </div>

          <div className="flex flex-row gap-2">
            <aside className="bg-amber-700 flex flex-col gap-2 p-2 max-w-[900px] min-w-[215px] rounded flex-wrap text-sm">
              <h1 className="font-bold my-1">Filter:</h1>
              {skillsAndRoles?.data?.map((filter, index) => (
                <MemberFilters
                  key={index}
                  categoryName={filter.name}
                  filterOptions={filter.elements}
                  selectedFilters={(filters) =>
                    handleFilters(filter.name, filters)
                  }
                />
              ))}
            </aside>

            <div className="grid grid-cols-3 gap-2">
              {filteredMembers?.map((member) => (
                <Member
                  key={member.id}
                  member={member}
                  onSelectMember={() => handleSelectedMember(member)}
                />
              ))}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default MembersDialogs;
