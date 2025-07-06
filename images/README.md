# Images Directory

## Adding Your Photos

To add your apartment photos to the gallery:

1. **Living Room Image**: Save your living room photo as `living-room.jpg` in this directory
2. **Other Photos**: You can add more photos and replace additional placeholders by following the same pattern used for the living room image

## Image Requirements

- **Format**: JPG, PNG, or WebP
- **Size**: Recommended minimum width of 800px for best quality
- **Aspect Ratio**: Images will be displayed in 16:9 aspect ratio
- **File Size**: Keep under 2MB for optimal loading times

## Current Photo Setup

The first placeholder has been replaced with a living room image structure. The image should be named `living-room.jpg` and placed in this directory.

## Adding More Photos

To replace additional placeholders:

1. Add your image file to this directory
2. In `index.html`, replace a `photo-placeholder` div with a `photo-item` div
3. Follow the same structure as the living room example:

```html
<div class="photo-item">
    <img src="images/your-photo.jpg" alt="Description of your photo" class="photo-img">
    <div class="photo-overlay">
        <h3>Room Name</h3>
        <p>Brief description</p>
    </div>
</div>
```