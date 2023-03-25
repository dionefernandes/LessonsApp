const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '..', '/data/db.json');

class LessonModel {
  async getDataFromFile() {
    const data = await fs.readFile(dbPath, 'utf-8');
    return JSON.parse(data);
  };

  async writeDataToFile(data) {
    const newData = JSON.stringify(data, null, 2);
    fs.writeFileSync(dbPath, newData);
  };

  async findAll() {
    const data = await this.getDataFromFile();
    return data.lessons;
  };

  async findById(id) {
    const data = this.getDataFromFile();
    return data.lessons.find( (lesson) => lesson.id === id );
  };

  async create(lesson) {
    const data = await this.getDataFromFile();

    const existingLesson = data.lessons.find(l => l.name === lesson.name);
    if(existingLesson) {
      throw new Error('A lesson with this name already exists');
    }

    const newLesson = { ...lesson, id: data.lessons.length + 1 };
    data.lessons.push(newLesson);
    await this.writeDataToFile(data);
    return newLesson;
  };

  async update(id, updatedLesson) {
    const data = this.getDataFromFile();
    const index = data.lessons.findIndex( (lesson) => lesson.id === id );

    if(index === -1) {
      return null;
    }

    const existingLesson = data.lessons.find( (lesson) => lesson.name === updatedLesson.name && lesson.id !== id);

    if(existingLesson) {
      throw new Error('A lesson with this name already exists')
    }

    const updatedLessonWithId = { ...updatedLesson, id };
    data.lessons.splice(index, 1, updatedLessonWithId);
    await this.writeDataToFile(data);
    return updatedLessonWithId;
  };

  async delete(id) {
    const data = await this.getDataFromFile();
    const index = data.lessons.findIndex( (lesson) => lesson.id === id );

    if(index === -1) {
      return null;
    }

    data.lessons.splice(index, 1);
    await this.writeDataToFile(data);
    return true;
  };
}

module.exports = LessonModel;