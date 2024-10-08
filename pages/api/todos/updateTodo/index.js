import { updateDataByAny } from "@/services/serviceOperations";

const handler = async (req, res) => {
  if (!req) {
    return res.status(500).json({ error: "İstek bulunamadı." });
  }
  if (req.method === "PUT") {
    try {
      const data = req.body;
      if (!data.todoDescription || !data.id) {
        throw new Error("Incomplete data. Please provide the necessary information.");
      }
      const todo = await updateDataByAny("Todo", { id: data.id }, { todoDescription: data.todoDescription });


      return res.status(200).json({
        success: true,
        message: "Todo güncelleme işlemi başarılı",
        todo: todo,
      });
    } catch (error) {
      return res.status(500).json({
        status: error.status,
        error: error.message,
      });
    }
  } else {
    return res.status(500).json({ error: "Yanlış istek." });
  }
};
export default handler;