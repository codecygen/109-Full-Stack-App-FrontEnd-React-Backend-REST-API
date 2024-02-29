const colorList = [
  ...new Set([
    "#191970", // Midnight Blue
    "#FF7F50", // Coral
    "#228B22", // Forest Green
    "#008080", // Teal
    "#2F4F4F", // Dark Slate Gray
    "#9370DB", // Mauve
    "#8B0400", // Dark Red 2
    "#FF7F24", // Dark Orange
    "#D2691E", // Chocolate
    "#008B8B", // Dark Cyan
    "#B22222", // Firebrick
    "#006400", // Dark Green
    "#9932CC", // Dark Orchid
    "#00008B", // Dark Blue
    "#76c12D", // Light Steel Blue
    "#8B0500", // Dark Red 3
    "#FFA500", // Orange
    "#8B5F65", // Rosy Brown
    "#008B8B", // Dark Cyan
    "#FF4500", // Orange Red
    "#FF4500", // Orange Red
    "#8B4513", // Saddle Brown
    "#002366", // Cobalt Blue
    "#FF8C69", // Salmon
    "#3CB371", // Medium Sea Green
    "#811111", // Maroon
    "#87CEEB", // Sky Blue
    "#748796", // Khaki
    "#B87333", // Copper
    "#9932CC", // Dark Orchid
    "#FF7F50", // Coral
    "#000080", // Navy Blue
    "#DAA520", // Goldenrod
    "#7FFF00", // Chartreuse
    "#8B1C62", // Dark Magenta
    "#61311D", // Dark Cyan
    "#8A2BE2", // Blue Violet
    "#A52A2A", // Brown
    "#FF7F24", // Dark Orange
    "#A9A9A9", // Dark Gray
    "#FF6347", // Tomato
    "#008B8B", // Dark Cyan
    "#228B22", // Forest Green
    "#8A2BE2", // Blue Violet
    "#008B8B", // Dark Cyan
    "#556B2F", // Dark Olive Green
    "#8B4513", // Saddle Brown
    "#7CFC00", // Lawn Green
    "#483D8B", // Dark Slate Blue
    "#191970", // Midnight Blue
    "#FF7F50", // Coral
    "#228B22", // Forest Green
    "#8B0075", // Dark Red
    "#9370DB", // Mauve
    "#00868B", // Dark Cyan
    "#8B1200", // Dark Red
    "#FF7F24", // Dark Orange
    "#4B0082", // Indigo
    "#D2691E", // Chocolate
    "#8B008B", // Dark Magenta
    "#8B4500", // Dark Orange
    "#2E8B57", // Sea Green
    "#B22222", // Firebrick
    "#006400", // Dark Green
    "#B0C4DE", // Light Steel Blue
    "#8B1200", // Dark Red
    "#FF4500", // Orange Red
    "#8B4513", // Saddle Brown
    "#B8860B", // Dark Goldenrod
    "#B22222", // Firebrick
    "#800080", // Purple
    "#252930",
  ]),
];

const pickRandomColor = () => {
  const pickedColor = colorList[Math.floor(Math.random() * colorList.length)];

  return pickedColor;
};

module.exports = pickRandomColor;
