class Task {
  constructor(id, note_id, user_id, description, status) {
    this.id = id;
    this.note_id = note_id;
    this.user_id = user_id;
    this.description = description;
    this.status = status; // 'pending' or 'completed'
  }
}

module.exports = Task;