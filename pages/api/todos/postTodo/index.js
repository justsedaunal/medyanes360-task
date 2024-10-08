import { createNewData } from "@/services/serviceOperations";

const handler = async (req, res) => {
  if (!req) {
    return res.status(500).json({ error: "İstek bulunamadı." });
  }
  
  if (req.method === "POST") {
    try {
      const data = req.body;
      console.log("Gönderilen veri:", data);

      // Gönderilen veriyi kontrol et
      if (!data.todoDescription) {
        throw new Error("Girdiğiniz bilgilerde hata var. Lütfen kontrol ediniz.");
      }

      // Asenkron fonksiyonu bekle
      const todo = await createNewData("todo", data);

      return res.status(200).json({
        success: true,
        message: "Todo ekleme işlemi başarılı",
        todo: todo,
      });
    } catch (error) {
      console.error("Hata:", error);
      return res.status(500).json({
        status: error.status || 500,
        error: error.message || "Bilinmeyen bir hata oluştu.",
      });
    }
  } else {
    return res.status(500).json({ error: "Yanlış istek." });
  }
};

export default handler;
