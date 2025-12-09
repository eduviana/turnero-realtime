import { getAllUsers } from "@/features/admin/users/services/getAllUsers";
import { toUserTableRow } from "@/features/admin/users/lib/toUserTableRow";
import UsersTable from "@/features/admin/users/components/UsersTable";


export default async function AdminUsersPage() {
  const users = await getAllUsers();
  const rows = users.map(toUserTableRow);

  return (
    <div className="container mx-auto py-10">
      <UsersTable data={rows} />
    </div>
  );
}