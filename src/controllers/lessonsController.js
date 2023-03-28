const LessonModel = require('../models/lessonModel');
 const JWT = require('../utils/jwt');

 const jwt = new JWT();

class LessonsController {
  constructor() {
    this.lessonModel = new LessonModel();
  }

  async lessonsAll(request, response) {
    try {
      const lessons = await this.lessonModel.findAll();
      response.status(200).json(lessons);
    } catch(error) {
      response.status(500).json( {message: error.message} );
    }
  };

  async lessonById(request, response) {
    const { id } = request.params;

    try {
      const lesson = await this.lessonModel.findById(id);

      if(!lesson) {
        response.status(404).json( {message: 'Lesson not found'} );
      } else {
        response.status(200).json(lesson);
      }
    } catch(error) {
      response.status(500).json( {message: error.message} );
    }
  };

  async createLesson(request, response) {
    const { title, description, duration, Teacher, ImgLink } = request.body;
    const lesson = { title, description, duration, Teacher, ImgLink };

    try {
      const newLesson = await this.lessonModel.create(lesson);
      response.status(201).json(newLesson);
    } catch(error) {
      response.status(500).json( {message: error.message} );
    }
  };

  async updateLesson(request, response) {
    const { id } = request.params;
    const { title, description, duration, Teacher, ImgLink } = request.body;
    const updatedLesson = { title, description, duration, Teacher, ImgLink };

    try {
      const result = await this.lessonModel.update(id, updatedLesson);

      if(!result) {
        response.staus(404).json( {message: 'Lesson not found'} );
      } else {
        response.status(200).json(result);
      }
    } catch(error) {
      response.status(500).json( {message: error.message} );
    }
  };

  async deleteLesson(request, response) {
    const { id } = request.params;

    try {
      const result = await this.lessonModel.delete(id);

      if(!result) {
        response.status(404).json( {message: 'Lesson not found'} );
      } else {
        response.staus(204).json('Lesson removed successfully');
      }
    } catch(error) {
      response.status(500).json( {message: error} );
    }
  };

  async authenticate(request, response) {
    const { username, password } = request.body;

    if(username === 'admin' && password === 'admin123') {
      const token = jwt.sign( {username}, {algorithm: 'RS256'} );
      response.status(200).json( {token} );
    } else {
      response.status(401).json( {message: 'Invalid username or password'} );
    }
  }
}

module.exports = new LessonsController();