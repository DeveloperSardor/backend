import ArticlesSchema from "../schemas/articles.js";

export class ArticlesContr {
  constructor() {}

  static async Get(req, res) {
    try {
      const { id } = req.params;
      const findArticlesById = await ArticlesSchema.findById(id);
      if (id) {
        res.send({
          status: 200,
          message: "Articles by Id",
          success: true,
          data: findArticlesById,
        });
      } else {
        res.send({
          status: 200,
          message: "Articles",
          success: true,
          data: await ArticlesSchema.find().sort({ createdAt : -1 }),
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
      const { title_en, title_ru, title_uz, desc_en, desc_ru, desc_uz, img } =
        req.body;
        console.log(req.body);
        
     

      const newArticles = await ArticlesSchema.create({
        title_en,
        title_ru,
        title_uz,
        desc_en,
        desc_ru,
        desc_uz,
        img
      });
      
      console.log(newArticles);
      
      res.send({
        status: 201,
        message: "Successfuly added",
        success: true,
        data: newArticles,
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
      const articlesById = await ArticlesSchema.findById(id);
      if (!articlesById) {
        throw new Error(`Not found articles`);
      }
      const { title_en, title_ru, title_uz, desc_en, desc_ru, desc_uz, img } =
        req.body;
      const updatedArticles = await ArticlesSchema.findByIdAndUpdate(
        id,
        { title_en, title_ru, title_uz, desc_en, desc_ru, desc_uz, img },
        { new: true }
      );
      res.send({
        status: 200,
        message: "Successfuly updated",
        success: true,
        data: updatedArticles,
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
      const articlesById = await ArticlesSchema.findById(id);
      if (!articlesById) {
        throw new Error(`Not found articles`);
      }
      const deleteArticle = await ArticlesSchema.findByIdAndDelete(id);
      res.send({
        status: 200,
        message: `Successfuly deleted`,
        success: true,
        data: deleteArticle,
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
