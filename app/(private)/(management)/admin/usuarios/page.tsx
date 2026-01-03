import UsersTable from "@/features/users/components/UsersTable";
import { toUserTableRow } from "@/features/users/lib/toUserTableRow";
import { getAllUsers } from "@/features/users/services/getAllUsers";


export default async function UsersPage() {

  const users = await getAllUsers();
  const rows = users.map(toUserTableRow);

  return (
    <div className="container mx-auto">
      <UsersTable data={rows} />
    </div>
  );
} 
