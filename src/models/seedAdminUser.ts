import User from "./User"; // ajuste o caminho se necessário

export default async function seedAdminUser() {
  try {
    const existingUser = await User.findOne({ email: "admin@admin.com" });

    if (!existingUser) {
      await User.create({
        email: "admin@admin.com",
        password: "senha123", // essa senha será automaticamente hasheada
        role: "teacher"
      });
      console.log("Usuário admin criado com sucesso.");
    } else {
      console.log("Usuário admin já existe.");
    }
  } catch (error) {
    console.error("Erro ao criar usuário admin:", error);
  }
}