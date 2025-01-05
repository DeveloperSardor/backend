import NationalListSchema from "../schemas/national-list.js";

export class NationalListContr {
  constructor() {}

  static async Get(req, res) {
    try {
      const { id } = req.params;
      if (id) {
        res.send({
          status: 200,
          message: "National list by Id",
          success: true,
          data: await NationalListSchema.findById(id),
        });
      } else {
        res.send({
          status: 200,
          message: "National list",
          success: true,
          data: await NationalListSchema.find(),
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
        images,
      } = req.body;
      const newNationalList = await NationalListSchema.create({
        title_en,
        title_ru,
        title_uz,
        text_en,
        text_ru,
        text_uz,
        youtube_link,
        images,
      });
      res.send({
        status: 201,
        message: `Successfuly added`,
        success: true,
        data: newNationalList,
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
      const findListById = await NationalListSchema.findById(id);
      if (!findListById) {
        throw new Error(`Not found national list`);
      }
      const {
        title_en,
        title_ru,
        title_uz,
        text_en,
        text_ru,
        text_uz,
        youtube_link,
        images,
      } = req.body;
      const updatedList = await NationalListSchema.findByIdAndUpdate(
        id,
        {
          title_en,
          title_ru,
          title_uz,
          text_en,
          text_ru,
          text_uz,
          youtube_link,
          images,
        },
        { new: true }
      );
      res.send({
        status: 200,
        message: `Successfuly updated`,
        success: true,
        data: updatedList,
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
      const findListById = await NationalListSchema.findById(id);
      if (!findListById) {
        throw new Error(`Not found national list`);
      }
      const deletedList = await NationalListSchema.findByIdAndDelete(id);
      res.send({
        status: 200,
        message: `Successfuly deleted`,
        success: true,
        data: deletedList,
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
