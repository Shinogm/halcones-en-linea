import Modal from "../../components/students/modal";
import { ModalButton } from "../../courses/cursos/open-modal-button";

export default function Constancia() {
	return (
		<main className="flex flex-col  h-full overflow-hidden gap-5">
			<div className="flex flex-row justify-between px-10 items-center">
				<div className="text-white">
					<p className="underline text-xl">Pedro Ortíz Júarez</p>
					<p className="">Lic. En Mercadotecnia Internacional</p>
				</div>
				<ModalButton
					className=" rounded-2xl px-10 p-1 bg-[#32374d]"
					modalNumber={1}
				>
					SOLICITAR CONSTANCIA
				</ModalButton>
			</div>
			<div className="bg-white h-[0.05rem] px-20 flex flex-col rounded-xl" />
			<div className="gap-5 flex flex-col p-10">
				<h1 className="underline text-white font-black text-xl">
					Pasos a seguir para la solicitud de tu constancia de estudios
				</h1>
				<p className="text-white flex flex-col gap-3 italic">
					<span className="font-black">
						1.-
						<span className="font-normal">
							Da click en el botón {"solicitar constancia"}
						</span>
					</span>
					<span className="font-black">
						2.-
						<span className="font-normal">
							Te llegará un correo de confirmación con los datos bancarios para
							realizar el pago correspondiente.
						</span>
					</span>
					<span className="font-black">
						3.-
						<span className="font-normal">
							Envía tu comprobante de pago al correo
						</span>{" "}
						nataly.soto@itesus.edu.mx
					</span>
					<span className="font-black">
						4.-
						<span className="font-normal">
							En un lapso de 72 horas tendrás tu constancia de estudios en tu
							correo electrónico
						</span>
					</span>
				</p>
			</div>
			<Modal modalNumber={1}>
				<div className="bg-white rounded-lg py-5 gap-10 w-1/3">
					<h2 className="flex flex-col w-full bg-gradient-to-tr from-[#1f5186] to-[#131a2d] text-white text-center">
						<p>¿Seguro que deseas solicitar tu constancia de estudios?</p>
					</h2>
					<div className="flex flex-row justify-around gap-5 py-3">
						<ModalButton
							modalNumber={2}
							className="bg-gradient-to-tr from-[#1f5186] to-[#131a2d] text-white font-black px-14 rounded-lg"
						>
							SI
						</ModalButton>
						<ModalButton
							actionType="close"
							className="bg-gradient-to-tr from-[#1f5186] to-[#131a2d] text-white font-black px-14 rounded-lg"
						>
							NO
						</ModalButton>
					</div>
				</div>
			</Modal>
			<Modal modalNumber={2}>
				<div className="bg-white rounded-lg py-5 gap-10 w-1/3">
					<h2 className="flex flex-col w-full bg-gradient-to-tr from-[#1f5186] to-[#131a2d] text-white text-center">
						{" "}
						<p>Solicitud enviada con éxito. Revisa tu correo electrónico.</p>
					</h2>
					<div className="flex flex-row justify-around gap-5 py-3">
						<ModalButton
							actionType="close"
							className="bg-gradient-to-tr from-[#1f5186] to-[#131a2d] text-white font-black px-14 rounded-lg"
						>
							Aceptar
						</ModalButton>
					</div>
				</div>
			</Modal>
			<div className="bg-white h-[0.05rem] px-20 flex flex-col rounded-xl" />
		</main>
	);
}
