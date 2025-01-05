import CharterSchema from "../schemas/charter.js";

export class CharterContr {
  constructor() {}

  static async Get(req, res) {
    try {
      const { id } = req.params;
      const charterById = await CharterSchema.findById(id);
      if (id) {
        res.send({
          status: 200,
          message: "Charter by Id",
          success: true,
          data: charterById,
        });
      } else {
        res.send({
          status: 200,
          message: "Charters",
          success: true,
          data: await CharterSchema.find(),
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
      const { title_en, title_ru, title_uz, link } = req.body;
      const newCharter = await AnnouncementSchema.create(
        title_en,
        title_ru,
        title_uz,
        link
      );
      res.send({
        status: 201,
        message: "Successfuly added",
        success: true,
        data: newCharter,
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
      const findCharterById = await CharterSchema.findById(id);
      if (!findCharterById) {
        throw new Error(`Not found charter`);
      }
      const { title_en, title_ru, title_uz, link } = req.body;
      const updated = await CharterSchema.findByIdAndUpdate(
        id,
        { title_en, title_ru, title_uz, link },
        { new: true }
      );
      res.send({
        status: 200,
        message: "Successfuly updated",
        success: true,
        data: updated,
      });
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
      const findCharterById = await CharterSchema.findById(id);
      if (!findCharterById) {
        throw new Error(`Not found charter`);
      }
      const deletedCharter = await CharterSchema.findByIdAndDelete(id);
      res.send({
        status: 200,
        message: `Successfuly deleted`,
        success: true,
        data: deletedCharter,
      });
    } catch (error) {
      res.send({
        status: 400,
        message: error.message,
        success: false,
      });
    }
  }
}
