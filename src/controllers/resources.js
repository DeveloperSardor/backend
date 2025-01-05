import ResourcesSchema from "../schemas/resources.js";

export class ResourceContr {
  constructor() {}

  static async Get(req, res) {
    try {
      const { id } = req.params;
      if (id) {
        res.send({
          status: 200,
          message: "Resources",
          success: true,
          data: await ResourcesSchema.findById(id),
        });
      } else {
        res.send({
          status: 200,
          message: "Resources",
          success: true,
          data: await ResourcesSchema.find(),
        });
      }
    } catch (error) {
      res.send({
        status: 400,
        message: error.message,
        success: false,
      });
    }
  }
  static async Post(req, res) {
    try {
      const {
        title_en,
        title_ru,
        title_uz,
        text_en,
        text_ru,
        text_uz,
        youtube_link,
        files,
      } = req.body;
      const newResource = await ResourcesSchema.create({
        title_en,
        title_ru,
        title_uz,
        text_en,
        text_ru,
        text_uz,
        youtube_link,
        files,
      });
      res.send({
        status: 201,
        message: "Successfuly added",
        success: true,
        data: newResource,
      });
    } catch (error) {
      res.send({
        status: 400,
        message: error.message,
        success: false,
      });
    }
  }
  static async Put(req, res) {
    try {
      const { id } = req.params;
      const findResourceById = await ResourcesSchema.findById(id);
      if (!findResourceById) {
        throw new Error(`Not found resource`);
      }
      const {
        title_en,
        title_ru,
        title_uz,
        text_en,
        text_ru,
        text_uz,
        youtube_link,
        files,
      } = req.body;
      const updateResource = await ResourcesSchema.findByIdAndUpdate(
        id,
        {
          title_en,
          title_ru,
          title_uz,
          text_en,
          text_ru,
          text_uz,
          youtube_link,
          files,
        },
        { new: true }
      );
      res.send({
        status : 200,
        message : "Successfuly updated",
        success : true,
        data : updateResource
      })
    } catch (error) {
      res.send({
        status: 400,
        message: error.message,
        success: false,
      });
    }
  }
  static async Delete(req, res) {
    try {
        const { id } = req.params;
      const findResourceById = await ResourcesSchema.findById(id);
      if (!findResourceById) {
        throw new Error(`Not found resource`);
      }
      const deleteResource = await ResourcesSchema.findByIdAndDelete(id);
      res.send({
        status : 200,
        message : "Successufuly deleted",
        success : true,
        data : deleteResource
      })
    } catch (error) {
      res.send({
        status: 400,
        message: error.message,
        success: false,
      });
    }
  }
}
