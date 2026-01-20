import UsersTable from "@/features/users/components/UsersTable";
import { toUserTableRow } from "@/features/users/lib/toUserTableRow";
import { getOperators } from "@/features/users/services/getOperators";



export default async function UsersPage() {

  const users = await getOperators();
  console.log(users, "ÑÑÑÑÑÑÑÑÑÑÑÑÑÑÑÑÑÑÑÑÑÑ")
  const rows = users.map(toUserTableRow);

  return (
    <div className="container mx-auto">
      <UsersTable data={rows} />
    </div>
  );
} 
