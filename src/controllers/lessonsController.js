const LessonModel = require('../models/lessonModel');
const path = require('path');
const fs = require('fs');
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
      const sign = jwt.sign( {username}, {algorithm: 'RS256'} );
      const token = sign.token;
      const privateKey = sign.privateKey;
      const publicKey = sign.publicKey;
      const expiresIn = sign.expiresIn;

      const cretedToken = await this.tokenList(token, privateKey, publicKey, expiresIn);

      response.status(200).json( {cretedToken} );
    } else {
      response.status(401).json( {message: 'Invalid username or password'} );
    }
  }

  async tokenList(token, privateKey, publicKey, expiresIn) {
    const tokenList = {
      token: token,
      privateKey: privateKey,
      publicKey: publicKey,
      expiresIn: expiresIn
    }

    const tokenExists = await this.lessonModel.tokenExists(token);
    
    if(!tokenExists) {
      return await this.lessonModel.createTokenItem(tokenList);
    } 

    return tokenExists.token;
  }

  async tokenValidate(request, response) {
    console.log(request);
    const token = request.headers['authorization'];

    if(!token) {
      return res.status(401).send( {message: 'Missing token'} );
    }

    const tokenItem = await this.lessonModel.findToken(token);

    if( !tokenItem || !tokenItem.publicKey || tokenItem.publicKey.trim() === '' ) {
      return res.status(401).send( {message: 'This token is not registered'} );
    }

    const publicKey = tokenItem.publicKey;

    jwt.verify(token, publicKey, { algorithms: ['RS256'] }, (err, user) => {
      if(err) {
        return response.status(403).send( {message: `Invalid token: ${err.message}`} );
      }

      request.user = user;
      return response.status(200).send( {message: 'Verified token'} );
    });
  }

  async expiredTokens() {
    const now = new Date();
    await this.lessonModel.deleteToken(now);
  }
}

module.exports = new LessonsController();