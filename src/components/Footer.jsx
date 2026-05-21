import Link from "next/link";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-10">

      <div className="max-w-7xl mx-auto px-4 py-10">

        <div className="grid md:grid-cols-3 gap-8">

          {/* Left */}
          <div>
            <h2 className="text-2xl font-bold text-green-500">
              IdeaVault
            </h2>

            <p className="mt-3 text-gray-400">
              Share startup ideas and explore innovation.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-xl font-semibold mb-3">
              Quick Links
            </h3>

            <div className="flex flex-col gap-2">

              <Link href="/">Home</Link>

              <Link href="/ideas">Ideas</Link>

              <Link href="/add-idea">Add Idea</Link>

            </div>
          </div>


          {/* Contact */}

<div>

<h3 className="text-xl font-semibold mb-3">
Contact
</h3>

<div className="space-y-2 text-gray-400">

<p>
Email:
support@ideavault.com
</p>

<p>
Phone:
+880 1234-567890
</p>

<p>
Location:
Dhaka, Bangladesh
</p>

</div>

</div>

          {/* Social */}
          <div>
            <h3 className="text-xl font-semibold mb-3">
              Follow Us
            </h3>

            <div className="flex gap-4 text-2xl">

              <FaFacebook />

              <FaGithub />

              <FaXTwitter />

            </div>
          </div>

        </div>

        <div className="border-t border-gray-700 mt-8 pt-5 text-center text-sm text-gray-400">
          © 2026 IdeaVault. All rights reserved.
        </div>

      </div>
    </footer>
  );
}