import Lottie from 'lottie-react';
import lazyLoaderAnimation from '../../../wallet_animation.json';

export default function LazyLoader() {
  return (
    <div className="flex items-center justify-center xl:my-44 lg:my-32 md:my-36 my-32">
      <div className="xl:w-80 lg:w-64 md:w-56 w-48">
        <Lottie loop={true} animationData={lazyLoaderAnimation} />
      </div>
    </div>
  );
}
