"use client";

import GroupList from "@/src/components/instructor/group/GroupList";
import useGroups from "@/src/hooks/instractor/group/useGroups";

export default function GroupsPage() {
  const {
    groups,
    isLoading,
    getGroups,
  } = useGroups();

  return (
    <div className="w-full p-8">
      <GroupList
        groups={groups}
        isLoading={isLoading}
        onGroupsChange={getGroups}
      />
    </div>
  );
}