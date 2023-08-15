import Instance from "../instance";

class ServiceWorker {
  static async getAllInfo(page: number | null = 1, search?: string) {
    const response = await Instance.get(
      !search ? `/?page=${page}` : `/?search=${search}`
    );
    return response.data;
  }

  static async getById(id: string) {
    const response = await Instance.get(`/${id}`);
    return response.data;
  }
}

export default ServiceWorker;
