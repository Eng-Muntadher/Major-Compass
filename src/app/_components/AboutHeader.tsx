import { Heart } from "lucide-react";

function AboutHeader() {
  return (
    <div className="mb-12 text-center">
      <div className="w-16 h-16 bg-linear-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
        <Heart className="w-8 h-8 text-white" />
      </div>
      <h1 className="text-4xl mb-4">About Major Compass</h1>
      <p className="text-xl text-gray-600">
        Helping Iraqi Students Find Their Perfect Career Path
      </p>
    </div>
  );
}

export default AboutHeader;
