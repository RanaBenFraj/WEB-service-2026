class Session {
  constructor(id, conference_id, title, speaker, start_time, end_time) {
    this.id = id;
    this.conference_id = conference_id;
    this.title = title;
    this.speaker = speaker;
    this.start_time = start_time;
    this.end_time = end_time;
  }
}

module.exports = Session;