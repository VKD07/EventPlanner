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

  // Handles selecting a member
  function handleSelectedMember(member) {
    onSelectMember?.(member);
  }

  // Handles updating selected filters per category
  function handleFilters(category, filters) {
    setActiveFilters((prev) => ({
      ...prev,
      [category]: filters,
    }));
  }

  // Filter members by name and selected filters
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

        {/* ✅ FIXED HEIGHT DIALOG CONTENT */}
        <Dialog.Content
          className="fixed bg-amber-200 shadow rounded-2xl
          top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
          w-[60vw] h-[700px] p-6 flex flex-col overflow-hidden"
        >
          <Dialog.Title className="text-xl mb-2 font-bold">
            Choose a member:
          </Dialog.Title>

          {/* Search Bar */}
          <div className="flex items-center gap-2 mb-3">
            <input
              className="bg-white rounded border-2 border-amber-500 w-full p-2"
              placeholder="Search Names"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <MagnifyingGlassIcon />
          </div>

          {/* Main layout: Filters + Member Grid */}
          <div className="flex flex-1 gap-3 overflow-hidden">
            {/* Sidebar Filters */}
            <aside className="bg-amber-700 flex flex-col gap-2 p-3 w-[240px] rounded text-sm overflow-y-auto">
              <h1 className="font-bold text-white my-1">Filter:</h1>
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

            {/* Scrollable Members Grid */}
            <div className="grid grid-cols-3 gap-3 flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-amber-600">
              {filteredMembers?.length > 0 ? (
                filteredMembers.map((member) => (
                  <Member
                    key={member.id}
                    member={member}
                    onSelectMember={() => handleSelectedMember(member)}
                  />
                ))
              ) : (
                <div className="col-span-3 text-center text-gray-700 mt-6">
                  No members found.
                </div>
              )}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default MembersDialogs;
