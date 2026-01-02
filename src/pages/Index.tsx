import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Categories from '@/components/Categories';
import Cities from '@/components/Cities';
import FeaturedSpaces from '@/components/FeaturedSpaces';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Categories />
        <Cities />
        <FeaturedSpaces />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
