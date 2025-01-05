import AnnouncementSchema from "../schemas/announcement.js";

export class AnnouncementContr {
  constructor() {}

  static async Get(req, res) {
    try {
      const { id } = req.params;
      const findAnnounceById = await AnnouncementSchema.findById(id);
      if (id) {
        res.send({
          status: 200,
          message: "Announcement by Id",
          success: true,
          data: findAnnounceById,
        });
      } else {
        res.send({
          status: 200,
          message: "Announcements",
          success: true,
          data: await AnnouncementSchema.find(),
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


  static async Post(req, res){
    try {
        const { title_en, title_ru, title_uz, desc_en, desc_ru, desc_uz, img } = req.body;
        const newAnnouncement = await AnnouncementSchema.create(title_en, title_ru, title_uz, desc_en, desc_ru, desc_uz, img)
        res.send({
            status : 201,
            message : "Successfuly added",
            success : true,
            data : newAnnouncement
        })
    } catch (error) {
        res.send({
            status : 400,
            message : error.message,
            success : false
        })
    }
  }


  static async Update(req, res){
    try {
        const { id } = req.params;
        const announcementById = await AnnouncementSchema.findById(id);
         if(!announcementById){
            throw new Error(`Not found announcement`)
         }
         const { title_en, title_ru, title_uz, desc_en, desc_ru, desc_uz, img } = req.body;

         const updatedAnnouncement = await AnnouncementSchema.findByIdAndUpdate(id, {title_en, title_ru, title_uz, desc_en, desc_ru, desc_uz, img}, {new : true})
         res.send({
            status : 200,
            message : `Successfuly updated`,
            success : true,
            data : updatedAnnouncement
         })
    } catch (error) {
        res.send({
            status : 400,
            message : error.message,
            success : false
        })
    }
  }


  static async Delete(req, res){
    try {
        const { id } = req.params;
        const announcementById = await AnnouncementSchema.findById(id);
        if(!announcementById){
           throw new Error(`Not found announcement`)
        }
        const deleteAnnouncement = await AnnouncementSchema.findByIdAndDelete(id);
        res.send({
            status : 200,
            message : `Successfuly deleted`,
            success : true,
            data : deleteAnnouncement
        })
    } catch (error) {
        res.send({
            status : 400,
            message : error.message,
            success : false
        })
    }
  }


}
