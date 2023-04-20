const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '..', '../data/db.json');
const tokenPath = path.join(__dirname, '..', '../data/tokenValidate.json');

class LessonModel {
  async getDataFromFile(pathFile) {
    return new Promise((resolve, reject) => {
      fs.readFile(pathFile, 'utf-8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve( JSON.parse(data) );
        }
      });
    });
  };

  async writeDataToFile(data, pathFile) {
    const newData = JSON.stringify(data, null, 2);
    const stream = fs.createWriteStream(pathFile, {flags: 'w'});
    stream.write(newData);
    stream.end();
    await new Promise((resolve, reject) => {
      stream.on('finish', () => {
        resolve();
      });
      stream.on('error', (err) => {
        reject(err);
      });
    });
  };

  async findAll() {
    const data = await this.getDataFromFile(dbPath);
    const resultLessons = data.lessons;
    return resultLessons.sort((a, b) => a.title.localeCompare(b.title));
  };

  async findById(id) {
    const data = await this.getDataFromFile(dbPath);
    return data.lessons.find( (lesson) => lesson.id == id );
  };

  async findByTitle(title) {
    const data = await this.getDataFromFile(dbPath);
    const resultLessons = data.lessons.filter(lesson => lesson.title.toLowerCase().includes(title.toLowerCase()));
    return resultLessons.sort((a, b) => a.title.localeCompare(b.title));
  }

  async create(lesson) {
    const data = await this.getDataFromFile(dbPath);

    const existingLesson = data.lessons.find(l => l.title === lesson.title);
    if(existingLesson) {
      throw new Error('A lesson with this name already exists');
    }

    const newLesson = { ...lesson, id: data.lessons.length + 1 };
    data.lessons.push(newLesson);
    await this.writeDataToFile(data, dbPath);
    return newLesson;
  };

  async update(id, updatedLesson) {
    const data = await this.getDataFromFile(dbPath);
    const index = data.lessons.findIndex( (lesson) => lesson.id == id );

    if(index === -1) {
      return null;
    }

    const existingLesson = data.lessons.find( (lesson) => lesson.title == updatedLesson.title && lesson.id != id);

    if(existingLesson) {
      throw new Error('A lesson with this name already exists')
    }

    const updatedLessonWithId = { ...updatedLesson, id };
    data.lessons.splice(index, 1, updatedLessonWithId);
    await this.writeDataToFile(data, dbPath);
    return updatedLessonWithId;
  };

  async delete(id) {
    const data = await this.getDataFromFile(dbPath);
    const index = data.lessons.findIndex( (lesson) => lesson.id == id );

    if(index === -1) {
      return null;
    }

    data.lessons.splice(index, 1);
    
    return this.writeDataToFile(data, dbPath);
  };

  async tokenExists(token) {
    const data = await this.getDataFromFile(tokenPath);
    return data.tokensList.find( (tokens) => tokens.token == token );
  };

  async isTokenValid(token, now) {
    const data = await this.getDataFromFile(tokenPath);
    const foundToken = data.tokensList.find((tokens) => tokens.token === token);
    
    if (!foundToken) {
      return false;
    }
    
    const createIn = new Date(foundToken.createIn);
    const expiresIn = foundToken.expiresIn;
    
    if ((createIn.getTime() + expiresIn * 1000) < now.getTime()) {
      return false;
    }
    
    return true;
}


  async deleteToken(atualToken, now) {
    const data = await this.getDataFromFile(tokenPath);
    const dataAtualToken = await this.tokenExists(atualToken);

    data.tokensList = data.tokensList.filter(token => {
      const createIn = new Date(token.createIn);
      const expiresIn = token.expiresIn;

      if( (createIn.getTime() + expiresIn * 1000) > now.getTime() ) {
        return data.tokensList.splice(token.token, 1);
      }
    });

    data.tokensList.push(dataAtualToken);
  
    return this.writeDataToFile(data, tokenPath);
  }

  async findToken(token) {
    const data = await this.getDataFromFile(tokenPath);
    return data.tokensList.find( (tokens) => tokens.token == token );
  }

  async createTokenItem(tokenItem) {
    const dateTime = new Date().getTime();
    tokenItem.createIn = dateTime;
    const token = tokenItem.token;

    const data = await this.getDataFromFile(tokenPath);

    data.tokensList.push(tokenItem);

    await this.writeDataToFile(data, tokenPath);
    
    return token;
  };
}

module.exports = LessonModel;