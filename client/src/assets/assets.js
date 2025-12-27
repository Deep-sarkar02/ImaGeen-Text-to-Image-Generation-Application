import logo from './logo.svg'
import logo_icon from './logo_icon.svg'
import facebook_icon from './facebook_icon.svg'
import instagram_icon from './instagram_icon.svg'
import twitter_icon from './twitter_icon.svg'
import star_icon from './star_icon.svg'
import rating_star from './rating_star.svg'
import sample_img_1 from './sample_img_1.png'
import sample_img_2 from './sample_img_2.png'
import profile_img_1 from './profile_img_1.png'
import profile_img_2 from './profile_img_2.png'
import profile_aaryan from './profile_aaryan.png'
import profile_ishita from './profile_ishita.png'
import profile_rahul from './profile_rahul.png'
import sample_img_3 from './sample_img_3.png'
import sample_img_4 from './sample_img_4.png'
import sample_img_5 from './sample_img_5.png'
import step_icon_1 from './step_icon_1.svg'
import step_icon_2 from './step_icon_2.svg'
import step_icon_3 from './step_icon_3.svg'
import email_icon from './email_icon.svg'
import lock_icon from './lock_icon.svg'
import cross_icon from './cross_icon.svg'
import star_group from './star_group.png'
import credit_star from './credit_star.svg'
import profile_icon from './profile_icon.png'

export const assets = {
  logo,
  logo_icon,
  facebook_icon,
  instagram_icon,
  twitter_icon,
  star_icon,
  rating_star,
  sample_img_1,
  sample_img_2,
  email_icon,
  lock_icon,
  cross_icon,
  star_group,
  credit_star,
  profile_icon,
  sample_img_3,
  sample_img_4,
  sample_img_5
}

export const stepsData = [
  {
    title: 'Describe Your Vision',
    description: 'Type a phrase, sentence, or paragraph that describes the image you want to create.',
    icon: step_icon_1,
  },
  {
    title: 'Watch the Magic',
    description: 'Our AI-powered engine will transform your text into a high-quality, unique image in seconds.',
    icon: step_icon_2,
  },
  {
    title: 'Download & Share',
    description: 'Instantly download your creation or share it with the world directly from our platform.',
    icon: step_icon_3,
  },
];

export const testimonialsData = [
  {
    image: profile_aaryan,
    name: 'Aaryan Sharma',
    role: 'Graphic Designer',
    stars: 5,
    text: `ImaGeen has completely changed my workflow. The AI generated images are of top-notch quality, and the speed is just incredible. Highly recommended for designers!`
  },
  {
    image: profile_ishita,
    name: 'Ishita Patel',
    role: 'Digital Marketer',
    stars: 5,
    text: `As a content creator, I often need unique visuals in a hurry. This tool has been a lifesaver, providing stunning images from just a few words of description.`
  },
  {
    image: profile_rahul,
    name: 'Rahul Varma',
    role: 'Social Media Manager',
    stars: 4,
    text: `I've been using this for social media posts, and the engagement has skyrocketed. It's user-friendly and very affordable. A must-have for every digital marketer.`
  },
]

export const plans = [
  {
    id: 'Basic',
    price: 10,
    credits: 100,
    desc: 'Best for personal use.'
  },
  {
    id: 'Advanced',
    price: 50,
    credits: 500,
    desc: 'Best for business use.'
  },
  {
    id: 'Business',
    price: 250,
    credits: 5000,
    desc: 'Best for enterprise use.'
  },
]