import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/content";
import { Header } from "@/components/header";
import { getService, services } from "@/components/services";

export function generateStaticParams() {
  return services.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  return { title: service ? `${service.title} · FinAssetZ` : "FinAssetZ" };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <>
      <Header />
      <main className="doc">
        <a className="back" href="/#services">
          Back to products
        </a>
        <img className="doc-photo" src={service.image} alt={service.imageAlt} />
        <p className="eyebrow">The process</p>
        <h1>{service.title}</h1>
        <p>{service.summary}</p>
        <ol className="service-steps">
          {service.steps.map((step, index) => (
            <li key={step.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <strong>{step.title}</strong>
                <p>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="fine">{service.note}</p>
        <a className="btn btn-solid" href="/#contact">
          Speak with us
        </a>
      </main>
      <Footer />
    </>
  );
}
