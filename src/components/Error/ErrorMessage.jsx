export const ErrorMessage = ({ message }) => (
    <div className="container mx-auto px-4 py-8 text-center">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Oops! Something went wrong</h2>
      <p className="text-gray-600 mb-4">{message}</p>
      <Button onClick={() => window.location.reload()}>Try Again</Button>
    </div>
  )