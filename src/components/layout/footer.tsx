import React from "react";

type FooterProps = {
  className?: string;
};

export default function Footer({ className, ...props }: FooterProps) {
  return <footer className={className}></footer>;
}
