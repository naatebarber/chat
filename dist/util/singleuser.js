import { genSalt, hash } from "bcrypt";
export async function singleUser(db) {
    let data = await db.query(`
    SELECT COUNT(*) FROM users
    `);
    let count = data?.rows?.[0]?.count;
    if (count !== "0")
        return;
    const username = "root";
    const password = "root";
    const salt = await genSalt(20);
    await db.query(`
    INSERT INTO users (
      username,
      password,
      config
    ) VALUES (
      $1,
      $2,
      $3
    )
    `, [username, hash(password, salt), {}]);
    console.log("Created default user 'root'");
}
//# sourceMappingURL=singleuser.js.map