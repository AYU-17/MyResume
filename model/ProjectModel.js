import mongoose from 'mongoose';

const FeatureSchema = new mongoose.Schema({
  icon:        { type: String },
  name:        { type: String },
  description: { type: String }
}, { _id: false });

const TechStackSchema = new mongoose.Schema({
  icon:     { type: String },
  name:     { type: String },
  type:     { type: String },
  gradient: { type: String }
}, { _id: false });

const ArchitectureSchema = new mongoose.Schema({
  icon:     { type: String },
  name:     { type: String },
  detail:   { type: String },
  gradient: { type: String }
}, { _id: false });

const ChallengeSchema = new mongoose.Schema({
  challenge: { type: String },
  solution:  { type: String }
}, { _id: false });

const TimelineSchema = new mongoose.Schema({
  phase:       { type: String },
  description: { type: String }
}, { _id: false });

const StatSchema = new mongoose.Schema({
  number: { type: Number },
  label:  { type: String }
}, { _id: false });

const OverviewSchema = new mongoose.Schema({
  description:   { type: String },
  objective:     { type: String },
  problemSolved: { type: String },
  type:          { type: String },
  duration:      { type: String },
  teamSize:      { type: String },
  role:          { type: String },
  status:        { type: String }
}, { _id: false });

const ProjectSchema = new mongoose.Schema({
  slug:         { type: String, required: true, unique: true, trim: true },
  title:        { type: String, required: true, trim: true },
  tagline:      { type: String, trim: true },
  category:     { type: String, trim: true },
  status:       { type: String, trim: true },
  image:        { type: String },
  tech:         [{ type: String }],
  github:       { type: String },
  demo:         { type: String },
  overview:     { type: OverviewSchema },
  features:     [FeatureSchema],
  techStack:    [TechStackSchema],
  architecture: [ArchitectureSchema],
  challenges:   [ChallengeSchema],
  timeline:     [TimelineSchema],
  stats:        [StatSchema],
  achievements: [{ type: String }],
  order:        { type: Number, default: 0 }   // for controlling display order
}, {
  timestamps: true
});

export default mongoose.model('projects', ProjectSchema);
