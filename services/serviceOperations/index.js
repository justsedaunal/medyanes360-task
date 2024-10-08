import prisma from "@/lib/prisma";


// POST
export async function createNewData(tableName, newData) {
  try {
    const data = await prisma[tableName].create({ data: newData });
    return data;
  } catch (error) {
    return { error: error.message };
  }
}

// GET ALL
  export async function getAllData(tableName) {
    try {
      const data = await prisma[tableName].findMany();
      return data;
    } catch (error) {
      return { error: error.message };
    }
  }

  export default {createNewData,getAllData}
