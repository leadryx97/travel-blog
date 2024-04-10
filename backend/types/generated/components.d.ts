import type { Schema, Attribute } from '@strapi/strapi';

export interface PostImageSlider extends Schema.Component {
  collectionName: 'components_post_image_sliders';
  info: {
    displayName: 'ImageSlider';
  };
  attributes: {
    ImageSlider: Attribute.Media;
  };
}

export interface PostSingleImage extends Schema.Component {
  collectionName: 'components_post_single_images';
  info: {
    displayName: 'SingleImage';
    description: '';
  };
  attributes: {
    SingleImage: Attribute.Media;
  };
}

export interface PostText extends Schema.Component {
  collectionName: 'components_post_texts';
  info: {
    displayName: 'Text';
  };
  attributes: {
    Text: Attribute.Text;
  };
}

export interface PostVideo extends Schema.Component {
  collectionName: 'components_post_videos';
  info: {
    displayName: 'Video';
  };
  attributes: {
    Video: Attribute.Media;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'post.image-slider': PostImageSlider;
      'post.single-image': PostSingleImage;
      'post.text': PostText;
      'post.video': PostVideo;
    }
  }
}
